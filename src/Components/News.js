import React, { Component } from 'react'
import NewsItem from './NewsItem'
import spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    //console.log("Hello, I am constructor from News Component!");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page==${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({
      articles: parseData.articles, totalResults: parseData.totalResults, loading: false
    })
    this.props.setProgress(100);

  }

  handleNextClick = async () => {
    this.props.setProgress(10);
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      this.props.setProgress(30);
      let data = await fetch(url);
      this.props.setProgress(50);
      let parseData = await data.json();
      this.props.setProgress(70);
      console.log(parseData);
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false,
        totalResults: parseData.totalResults
      })
      this.props.setProgress(100);
    }
  }
  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{ margin: '38px', marginTop:"90px" }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <spinner />}
        
        
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<spinner/>}
        >
<div className="container">
          <div className="row my-3">
            {this.state.articles.map((element, index) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} NewsUrl={element.url} author={element.author} source = {element.source.name} date={element.publishedAt} />
              </div>
            ))}


          </div>
          </div>
        </InfiniteScroll>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}


export default News; 