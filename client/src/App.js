import React, { Component, Suspense } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Portfolio from "./Components/Portfolio";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies, CookiesProvider } from 'react-cookie';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      resumeData: {
        en: {},
        fr: {}
      },
      siteLang: cookies.get('siteLang') || navigator.language
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <CookiesProvider>
        <Suspense fallback={<span>Loading...</span>}>
          <div className="App">
            <Header data={this.state.resumeData.main} />
            <About data={this.state.resumeData.main} />
            <Resume data={this.state.resumeData.resume} />
            <Portfolio data={this.state.resumeData.portfolio} />
            <Contact data={this.state.resumeData.main} />
            <Footer data={this.state.resumeData.main} />
          </div>
        </Suspense>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);