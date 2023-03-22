import { useEffect, useState } from 'react'
import axios from 'axios'

const NewsFeed = () => {
  const [articles,setArticles] = useState(null)
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://h-crypto-news.p.rapidapi.com/cryptonews',
      headers: {
        'X-RapidAPI-Key': '81d259c83cmsh1ad8ab2a7c82e5ap127898jsn82384336bb17',
        'X-RapidAPI-Host': 'h-crypto-news.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data)
      setArticles(response.data)
    }).catch(function (error) {
      console.error(error)
    })
  }, [])

  console.log(articles)
  const first5Articles = articles?.slice(0,5)

  return (
    <div className = "news-feed">
      <h2>News Feed</h2>
      {first5Articles?.map((article,_index) => (
      <div key={_index}>
        <a href = {article.url}><p>{article.title}</p></a>
        </div>))}
    </div>
    )
  }
  
  export default NewsFeed