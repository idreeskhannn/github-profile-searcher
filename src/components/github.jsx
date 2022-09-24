import React from 'react'
import { useState, useEffect } from "react";
import Error from "../images/error.png";
import Profile from "../images/download.png";
import axios from "axios";

const Github = () => {
  const [inputValue, setInputValue] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState(false);
  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/users/${inputValue ? inputValue : "idreeskhannn"}`
      )
      .then((res) => {
        setUserInfo(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [callApi]);
    const handleForm = (e) => {
    e.preventDefault();
    console.log("inputValue", inputValue);

    if (!inputValue) {
      console.log("filed is empty");
      return;
    }

    setCallApi(!callApi);
  };
  return (
    <>
    <div className='background1'>

      <div className='div'>
        <div className='inpt'>
          <form onSubmit={handleForm}>
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              type="text"
              placeholder="Search name..."
            />
          </form>
        </div>
        {error === false ? (
          <div>

            <div className='imgg'>
              <img src={userInfo ? userInfo.avatar_url : Profile} className="img" alt="img" />
            </div>
            <div className='lii'>
              <li>Name : {userInfo ? userInfo.name : "USER NAME"}</li>
              <li>BIO  : {userInfo ? userInfo.bio : "USER BIO "}</li>
              <li>Repo's :{userInfo ? userInfo.public_repos : "USER Public Repo's "}</li>
              <li>Followers : {userInfo ? userInfo.followers : "USER followers "}</li>
            </div>
          </div>
        ) : (
          <div className='img11'>

            <img src={Error} className="erimg" />
          </div>
        )}
      </div>

    </div>
    </>
  )
}

export default Github