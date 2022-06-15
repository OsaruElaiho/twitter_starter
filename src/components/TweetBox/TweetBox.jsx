import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"
import UserProfile from "../UserProfile/UserProfile"

export default function TweetBox({userProfile, setTweets, tweetText="", setTweetText}) {
  const handleOnTweetTextChange = (e) => {
    setTweetText(e.target.value)
  }

  const handleOnSubmit = () => {
      const newTweet = {
        name: userProfile.name,
        handle: userProfile.handle,
        text: tweetText,
        comments: 0,
        retweets: 0,
        likes: 0
      }
      
      setTweets((pastTweets) =>
        [...pastTweets,{...newTweet,id:pastTweets.length}]
      )
      setTweetText("")
  }

  // Disable the button when user hasn't entered any text yet, 
  // or they have more than 140 characters in their tweet.
  const disableBtn = (tweetText.length === 0) || (tweetText.length > 140)
  // If the number of characters left is a negative number --> red css
  const numCharsLeft = 140 - tweetText.length

  return (
    <div className="tweet-box">
      <TweetInput
      value={tweetText}
      handleOnChange={handleOnTweetTextChange}
      />

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount 
        tweetText={tweetText}
        numCharsLeft={numCharsLeft}
        />
        <TweetSubmitButton 
        handleOnSubmit={handleOnSubmit}
        disableBtn={disableBtn}
        />
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount({tweetText,numCharsLeft}) {
  // ADD CODE HERE
  const condition = tweetText.length < 0 ? "" : "red"
  return <span className={`tweet-length ${condition}`}>{tweetText.length > 0 ? numCharsLeft : ""}</span>
}

export function TweetSubmitButton({handleOnSubmit,disableBtn}) {
  return (
    <div className="tweet-submit">
      <i className="fas fa-plus-circle"></i>
      <button className="tweet-submit-button" onClick={handleOnSubmit} disabled={disableBtn}>
        Tweet</button>
    </div>
  )
}
