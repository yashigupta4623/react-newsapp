import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title, description, imgUrl, NewsUrl,author, date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style = {{display: 'flex',justifyContent :'flex-end', width: '35px' ,position:'absolute',right:'0'}}>
      
            <span className=' badge rounded-pill bg-danger'> {source}</span>
          </div>
          <img src={!imgUrl?"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg":imgUrl} />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
            
                    <a href={NewsUrl} target = "_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
        </div>
      </div>
    )
  }
}

export default NewsItem