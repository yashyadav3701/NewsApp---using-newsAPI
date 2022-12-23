import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,name}=this.props;
    return (
       <div className="card my-3">
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
        {name}
        </span>
          <img src={!imageUrl?"https://static01.nyt.com/images/2017/07/02/magazine/02firstwords/02firstwords-jumbo.jpg?quality=75&auto=webp":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
    )
  }
}

export default NewsItems