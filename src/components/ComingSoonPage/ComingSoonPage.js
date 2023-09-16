/*
 * Copyright 2023 - John Hanna (https://github.com/JPychon)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import axios from 'axios';
import logo from '../../images/logo.png';
import React, { useState, useEffect } from 'react';
import comingSoon from '../../images/coming-soon.png';
import styled, { keyframes, css } from 'styled-components';
import { FeedbackModal } from '../Feedback/FeedbackModal.js';

// Keyframes

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

export const fadeOutAnimation = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

export const carveCircle = keyframes`
  0% {
    opacity: 0;
    width: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    width: 200px;
    height: 200px;
  }
`;

export const fadeInLogo = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const fadeOutAndRemove = keyframes`
  0% { opacity: 1; }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

export const InputGroupAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Images

export const ComingSoonImage = styled.img`
  width: 60vw;
  height: 50vh;
  max-width: 600px;
  margin-bottom: 2vh; 
  opacity: 0;
  animation: ${fadeIn} 2s 6s forwards;
`;

export const AnimatedLogo = styled.img`
  width: 180%;
  height: 180%;
  object-fit: cover;
  animation: ${fadeInLogo} 2s 4s forwards;
  opacity: 0;
`;

// Styled Components

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(160deg, #0F1722 0%, #121212 100%);
  font-family: 'Arial', sans-serif;
  padding: 0 20px;
  max-width: 100vw; 
  margin: 0 auto;
  animation: ${fadeIn} 2s forwards;
`;

export const EmailInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 16px;
  width: 60vw;
  max-width: 400px;
  flex: 1;
`;

export const NotifyButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 0 5px 5px 0;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  height: fit-content;
  transition: background-color 0.3s ease-in-out;
  background-color: #d62828;
  &:hover {
    background-color: #7b1113;
  }
`;

export const AnimatedCircle = styled.div`
  background: white;
  border-radius: 50%;
  width: 40vw;
  height: 40vh;
  animation: ${carveCircle} 1.5s 1.5s forwards;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const InputGroup = styled.div`
  marginBottom: 35px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  ${props =>
        props.fadeOut
            ? css`animation: ${fadeOutAnimation} 0.5s forwards;`
            : css`animation: ${InputGroupAnimation} 1s 7s forwards;`}
  opacity: 0;
`;

export const ComingSoonPage = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [showInput, setShowInput] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  const [loading, setLoading] = useState(false);
  const [triggerFadeOut, setTriggerFadeOut] = useState(false);

  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleNotify = async () => {
    if (!isValidEmail(email)) {
      setMessage('Invalid email address.');
      setShowFeedback(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://tapcheffunctions.azurewebsites.net/api/EmailRegisteration?code=b1ySVBX-cRwi2SGiLWnP29coPvZHAHnHe0z8ztC3S10wAzFuVw3eEw==', { email });

      if (response.status === 200) {
        setMessage('Thank you for subscribing. We will notify you as we near our official launch. Stay tuned!');
        setShowFeedback(true);
        setTriggerFadeOut(true);
        setTimeout(() => {
          setShowInput(false);
        }, 500);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('This email address is already subscribed, please try a different one.');
        setShowFeedback(true);
      } else {
        setMessage('Failed to subscribe. Please try again.');
        setShowFeedback(true);
      }
    }

    setLoading(false);

  };

  return (
    <MainContainer>
      <AnimatedCircle>
        <AnimatedLogo src={logo} alt="Logo" />
      </AnimatedCircle>
      <ComingSoonImage src={comingSoon} alt="Coming Soon" />
      {showInput && (
        <InputGroup fadeOut={triggerFadeOut}>
          <EmailInput placeholder="Email.." value={email} onChange={e => setEmail(e.target.value)} />
          <NotifyButton onClick={handleNotify}>
          {loading ? "Processing..." : "Notify Me"}
          </NotifyButton>
        </InputGroup>
      )}
      {showFeedback && (
        <FeedbackModal 
          message={message} 
          onClose={() => setShowFeedback(false)} 
        />
      )}
    </MainContainer>
  );
};




