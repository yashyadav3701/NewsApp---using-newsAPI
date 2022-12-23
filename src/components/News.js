import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:6,
    category:'general',
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  capatilize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props)
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0,
    }
    document.title=`${this.capatilize(this.props.category)} - NewsApp`;
  }
  async updateNews(){
    this.props.setprogress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=960c4b2ce46f45c0bf8034375f4333d2&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    this.props.setprogress(30);
    let parsedData=await data.json();
    this.props.setprogress(70);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false,
    });
    this.props.setprogress(100);
  }
  async componentDidMount(){
    this.updateNews();
  }
  // handlePrevClick=async ()=>{
  //   this.setState({page:this.state.page-1});
  //   this.updateNews();
  // }
  // handleNextClick=async ()=>{
  //   this.setState({page:this.state.page+1});
  //   this.updateNews();
  // }
  fetchMoreData = async() => {
    this.setState({page:this.state.page+1});
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=960c4b2ce46f45c0bf8034375f4333d2&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
    });
  };
  render() {
    return (
      <>
        <h2 className="text-center my-3"> -- Top {this.props.category==='general'?"News":this.capatilize(this.props.category)} Headlines --</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
          <div className="row my-3">
            {this.state.articles.map((element)=>{
            return <div className="col-md-4 my-2" key={element.url}>
               <NewsItems title={element.title} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} name={element.source.name}/>
            </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Prev</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    );
  }
}

export default News;
