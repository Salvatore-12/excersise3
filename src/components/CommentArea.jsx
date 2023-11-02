
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import { useEffect, useState } from 'react'

const CommentArea=(asin)=>{
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // }
const[comments,setComment]=useState([])
const[isLoading,setisLoading]=useState(false)
const[isError,setisError]=useState(false)

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }
useEffect(()=>{ 
  const stateFetch= async () => {
    setisLoading(true)
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' +
          asin,
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNTkwYmY2ZTNkZDAwMTQ5NWU0M2IiLCJpYXQiOjE2OTgzMjI2OTksImV4cCI6MTY5OTUzMjI5OX0.MhL9A8MYzlGVPmFAwkTFMLox9q4EAlNAIzgZrExP_D0',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        const comments = await response.json()
        // this.setState({
        //   comments: comments,
        //   isLoading: false,
        //   isError: false,
        // })
        setComment(comments)
        setisLoading(false)
        setisError(false)


      } else {
        // this.setState({ isLoading: false, isError: true })
        setisLoading(false)
        setisError(true)
      }
    } catch (error) {
      console.log(error)
      // this.setState({ isLoading: false, isError: true })
      setisLoading(false)
      setisError(true)
    }
  }
  stateFetch()
},[asin])
 

 
    return (
      <div className="text-center">
        {isLoading && <Loading />}
        {isError && <Error />}
        <AddComment asin={asin} />
        <CommentList commentsToShow={comments} />
      </div>
    )
  
}

export default CommentArea
