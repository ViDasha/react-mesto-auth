import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      currentUser: {},
      cards: [],
      loggedIn: false
    }
  }

  componentDidMount() {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([currentUser, cards]) => {
      this.setState({
        currentUser: currentUser,
        cards: cards
      })
    })
    .catch(err => {
    // тут ловим ошибку
      console.log(err); // выведем ошибку в консоль
    });
  }

  handleCardLike = (card) => {
    const setCards = (newCard) => {
      this.setState({ cards: this.state.cards.map((c) => c._id === card._id ? newCard : c)});
    };

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeCardLike(card._id, isLiked)
      .then((newCard) => {
        setCards(newCard);
      })
      .catch(err => {
        console.log(err);
      });
  } 

  handleCardDelete = (card) => {
    const updateCards = () => {
      this.setState({ cards: this.state.cards.filter((c) => c._id !== card._id)});
    }

    api.deleteCard(card._id)
      .then(() => {
        updateCards();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card
    })
  }

  handleEditAvatarClick = () => {
    this.setState({
      isEditAvatarPopupOpen: true
    });
  }
    
  handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true
    });
  }
    
  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true
    });
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {}
    })
  }

  handleUpdateUser = (inputValues) => {
    api.patchUserInfo(inputValues)
    .then((userInfo) => {
      this.setState({
        currentUser: userInfo
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  handleUpdateAvatar = (inputValues) => {
    api.patchUserAvatar(inputValues.avatar)
    .then((userInfo) => {
      this.setState({
        currentUser: userInfo
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  handleAddPlaceSubmit = (inputValues) => {
    api.postNewCard(inputValues)
    .then((newCard) => {
      this.setState({
        cards: [newCard, ...this.state.cards]
      });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="page">
        <Header />
        <Switch>
          <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/signin" /> : <Redirect to="/signup" />}
          </Route>
          <Route path="/signin">
            <div className="loginContainer">
              <Login  />
            </div>
          </Route>
          <Route path="/signup">
            <div className="registerContainer">
              <Register />
            </div>
          </Route>
          <Route path="/success">
          <Main 
            onEditProfile = {this.handleEditProfileClick} 
            onAddPlace = {this.handleAddPlaceClick} 
            onEditAvatar = {this.handleEditAvatarClick}
            onCardClick = {this.handleCardClick}
            onCardLike = {this.handleCardLike}
            onCardDelete = {this.handleCardDelete}
            cards = {this.state.cards}
            />
          <Footer />
          <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar} />
          <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser} currentUser={this.state.currentUser}/>
          <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit} />
          <ImagePopup 
            onClose = {this.closeAllPopups}
            card = {this.state.selectedCard}
          />
          </Route>
        </Switch>
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
