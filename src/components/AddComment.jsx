
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment=({asin})=> {
 
const[comments,setComment]=useState({
comments:"",
rate: 1,
elementId:asin,
})
useEffect(()=>{setComment((prevProps)=>(
  {...prevProps,
    element:asin}));},[asin])

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     })
  //   }
  // }

  const sendComment = async (e) => {
    e.preventDefault()
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comments),
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNTkwYmY2ZTNkZDAwMTQ5NWU0M2IiLCJpYXQiOjE2OTgzMjI2OTksImV4cCI6MTY5OTUzMjI5OX0.MhL9A8MYzlGVPmFAwkTFMLox9q4EAlNAIzgZrExP_D0',
          },
        }
      )
      if (response.ok) {
        alert('Recensione inviata!')
        // this.setState({
        //   comment: {
        //     comment: '',
        //     rate: 1,
        //     elementId: this.props.asin,
        //   },
        // })
        setComment({comments:"",rate:1,elementId:asin})
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    } catch (error) {
      alert(error)
    }
  }

 
    return (
      <div className="my-3">
        <Form onSubmit={sendComment}>
          <Form.Group className="mb-2">
            <Form.Label>Recensione</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci qui il testo"
              value={comments.comments}
              onChange={(e) =>
                // this.setState({
                //   comment: {
                //     ...this.state.comment,
                //     comment: e.target.value,
                //   },
                // })
                setComment(comments)
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              as="select"
              value={comments.rate}
              onChange={(e) =>
                setComment({
                  comments: {
                    ...comments,
                    rate: e.target.value,
                  },
                })
              }
                // this.setState({
                //   comment: {
                //     ...this.state.comment,
                //     rate: e.target.value,
                //   },
                // })
              
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </div>
    )
  
}

export default AddComment
