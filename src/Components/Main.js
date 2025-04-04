import React, { Component } from 'react';
import Home from "./Home";
import Contact from './Contact';
import Header from './Header';
import Menu from './Menu';
import DishDetails from './DishDetails';
import Footer from './Footer';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import About from './About';
import {connect} from 'react-redux';
import { postComment, postFeedback , fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../Redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
    return{
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      
    }
}

const mapDispatchToProps = dispatch => ({
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))  ,
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {
  
  
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const Homepage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]} 
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}  
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
           //comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.addComment}
        />
      )
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                  <Route path='/home' component={Homepage} />
                  <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                  <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' component={DishWithId} />
                  <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} 
                                                                  postFeedback={this.props.postFeedback} />} />
                  <Redirect to="/home" />
              </Switch>
            </CSSTransition>
        </TransitionGroup>
       
        <Footer />
      </div>
  );
  }
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
