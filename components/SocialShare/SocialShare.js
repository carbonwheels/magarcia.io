import { Component } from 'react';
import PropTypes from 'prop-types';
import TwitterLogo from './TwitterLogo';
import FacebookLogo from './FacebookLogo';
import LinkedInLogo from './LinkedInLogo';
import css from './SocialShare.module.css';

const NETWORKS = [
  {
    name: 'Twitter',
    urlBuilder: (title, url) =>
      `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=martinprins`,
    Logo: TwitterLogo
  },
  {
    name: 'Facebook',
    urlBuilder: (_, url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    Logo: FacebookLogo
  },
  {
    name: 'LinkedIn',
    urlBuilder: (title, url) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&source=https%3A//www.linkedin.com/in/martingarciamonterde/`,
    Logo: LinkedInLogo
  }
];
export default class SocialShare extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  state = {
    visible: false,
    ssr: true
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.setState({
      visible: window.pageYOffset > 90,
      ssr: false
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.setState({
      visible: window.pageYOffset > 90
    });
  }

  render() {
    const { title, url } = this.props;
    const { visible, ssr } = this.state;
    return (
      <aside
        className={`${css.aside} ${visible ? css.visible : ''} ${ssr ? css.ssrAnimation : ''}`}
      >
        {NETWORKS.map(({ name, urlBuilder, Logo }) => (
          <a
            title={`Share on ${name}`}
            key={name}
            aria-label={`Share on ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            href={urlBuilder(title, url)}
          >
            <Logo />
          </a>
        ))}
      </aside>
    );
  }
}
