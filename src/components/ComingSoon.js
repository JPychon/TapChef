import axios from 'axios';
import logo from '../images/logo.png';
import React, { useState, useEffect } from 'react';
import comingSoon from '../images/coming-soon.png';
import styled, { keyframes, css } from 'styled-components';


const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const carveCircle = keyframes`
  0% {
    opacity: 0;
    width: 0;
    height: 0;
  }
  100% {
    opacity: 1;
    width: 300px;
    height: 300px;
  }
`;

const fadeInLogo = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const MainContainer = styled.div`
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

const ComingSoonImage = styled.img`
  width: 60vw;
  max-width: 400px;
  margin-bottom: 2vh; 
  opacity: 0;
  animation: ${fadeIn} 2s 6s forwards;
`;

const EmailInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  font-size: 16px;
  width: 60vw;
  max-width: 400px;
  flex: 1;
`;

const NotifyButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #FF4500;
  color: white;
  cursor: pointer;
  font-size: 16px;
  height: fit-content;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #cd7f16;
  }
`;

const fadeOutAndRemove = keyframes`
  0% { opacity: 1; }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;


const FeedbackModal = styled.div`
  position: fixed; // 'fixed' ensures it's always centered on the viewport
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  background-color: ${(props) => props.bgColor || "#F44336"};
  border: none;
  text-align: center;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  color: black; 
  font-size: 1rem; // Use rem units for better scalability and responsiveness
  letter-spacing: 0.3px;
  transition: all 0.3s ease-in-out; // Smooth transition for any potential hover effects or other changes
  max-width: 90vw; // Ensures the modal won't be wider than the viewport
  width: 400px; // A fixed width, but it will respect max-width if the screen is smaller
  animation: ${fadeIn} 0.7s ease-in-out, ${fadeOutAndRemove} 0.7s 5s forwards;
  z-index: 10;
  @media (max-width: 480px) {
    width: 90vw; // Makes the modal wider on smaller screens for better usage of space
    padding: 15px 20px; // Slightly reduced padding for mobile devices
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center; 
  justify-content: start;
  margin-bottom: 1rem; 
`;

// const FeedbackIcon = styled.span`
//   font-size: 1.8rem;
//   margin-right: 0.5rem;
//   display: flex; 
//   align-items: center; 
// `;

const FeedbackTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600; 
  color: black; 
  margin: 0; 
  font-family: 'Roboto', sans-serif; 
`;

const FeedbackMessage = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: black; 
  font-family: 'Roboto', sans-serif;
`;

const AnimatedCircle = styled.div`
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

const AnimatedLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeInLogo} 2s 4s forwards;
  opacity: 0;
`;

const InputGroupAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const InputGroup = styled.div`
  marginBottom: 20px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  ${props =>
    props.fadeOut
      ? css`animation: ${fadeOutAnimation} 0.5s forwards;`
      : css`animation: ${InputGroupAnimation} 1s 7s forwards;`}
  opacity: 0;
`;


export const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('#F44336');
  const [showInput, setShowInput] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
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
      setFeedbackColor('#F44336');
      setShowFeedback(true);
      return;
    }

    try {
      const response = await axios.post('https://tapcheffunctions.azurewebsites.net/api/EmailRegisteration?code=b1ySVBX-cRwi2SGiLWnP29coPvZHAHnHe0z8ztC3S10wAzFuVw3eEw==', { email });

      if (response.status === 200) {
        setMessage('You have been registered in our newsletter, we will let you know once launch is close!');
        setFeedbackColor('#4CAF50');
        setShowFeedback(true);
        setTriggerFadeOut(true);
        setTimeout(() => {
          setShowInput(false);
        }, 500);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage('This email is already registered in our newsletter, we will let you know once launch is close!');
        setFeedbackColor('skyblue');
        setShowFeedback(true);
      } else {
        setMessage('Failed to subscribe. Please try again.');
        setFeedbackColor('#F44336');
        setShowFeedback(true);
      }
    }
  };


  const getFeedbackContent = () => {
    let icon = '', title = '';
    switch (feedbackColor) {
      case '#4CAF50':
        icon = 'success';
        title = 'Congratulations!';
        break;
      case 'skyblue':
        icon = 'conflict';
        title = 'Oops!';
        break;
      case '#F44336':
      default:
        icon = 'error';
        title = 'Oops!';
        break;
    }
    return { icon, title };
  };

  return (
    <MainContainer>
      <AnimatedCircle>
        <AnimatedLogo src={logo} alt="Logo" />
      </AnimatedCircle>
      <ComingSoonImage src={comingSoon} alt="Coming Soon" />
      {showInput && (
        <InputGroup fadeOut={triggerFadeOut}>
          <EmailInput placeholder="Your email..." value={email} onChange={e => setEmail(e.target.value)} />
          <NotifyButton onClick={handleNotify}>Notify Me</NotifyButton>
        </InputGroup>
      )}
      {showFeedback && (
        <FeedbackModal bgColor={feedbackColor}>
          <ModalHeader>
            {/* <FeedbackIcon className={getFeedbackContent().icon}>
              {
                getFeedbackContent().icon === 'success' ? '✅' :
                  getFeedbackContent().icon === 'error' ? '❌' :
                    getFeedbackContent().icon === 'conflict' ? '⚠️' :
                      null
              }
            </FeedbackIcon> */}
            <FeedbackTitle>{getFeedbackContent().title}</FeedbackTitle>
          </ModalHeader>
          <FeedbackMessage>{message}</FeedbackMessage>
        </FeedbackModal>
      )}
    </MainContainer>
  );
};




