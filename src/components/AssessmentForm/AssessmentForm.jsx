import React, { useState }  from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./AssessmentForm.css";

const AssessmentForm = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const surveyJson = {
    "title": "Cybercrime Assessment Form",
    "description": "This Cybercrime Assessment Form is designed to evaluate your knowledge and awareness of cybercrime, its various forms, and the appropriate actions to prevent and report incidents. Through this quiz, we aim to assess your understanding of the Philippine laws, key cybercrime concepts, and best practices for staying safe online.",
    "logoPosition": "right",
    "completedHtml": "<h3>You Finished the Assessment Form</h3>",
    "completedBeforeHtml": "<h3>You have already completed the Assessment Form.</h3>",
    "loadingHtml": "<h3>Loading the Assessment Form...</h3>",
    "pages": [
      {
        "name": "page1",
        "title": "Section 1: General Knowledge on Cybercrime",
        "elements": [
          {
            "type": "radiogroup",
            "name": "question1",
            "title": "What is considered a cybercrime under Philippine law?",
            "isRequired": true,
            "choices": [
              {
                "value": "2",
                "text": "Unauthorized access to computer systems"
              },
              {
                "value": "3",
                "text": "Cyberbullying"
              },
              {
                "value": "4",
                "text": "Online scams or phishing"
              },
              {
                "value": "10",
                "text": "All of the above"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question2",
            "title": "What is the name of the Philippine law that addresses cybercrime?",
            "isRequired": true,
            "choices": [
              {
                "value": "2",
                "text": "Data Privacy Act of 2012"
              },
              {
                "value": "10",
                "text": "Cybercrime Prevention Act of 2012"
              },
              {
                "value": "3",
                "text": "E-Commerce Act of 2000"
              },
              {
                "value": "4",
                "text": "Anti-Hacking Act"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question3",
            "title": "Which government agency handles cybercrime complaints in the Philippines?",
            "isRequired": true,
            "choices": [
              {
                "value": "2",
                "text": "Department of Trade and Industry (DTI)"
              },
              {
                "value": "10",
                "text": "National Bureau of Investigation (NBI) Cybercrime Division"
              },
              {
                "value": "3",
                "text": "Department of Science and Technology (DOST)"
              },
              {
                "value": "4",
                "text": "Commission on Information and Communications Technology (CICT)"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question4",
            "title": "What is a phishing attack?",
            "isRequired": true,
            "choices": [
              {
                "value": "2",
                "text": "A type of fishing game played online"
              },
              {
                "value": "10",
                "text": "An attempt to steal sensitive information by pretending to be a trustworthy entity"
              },
              {
                "value": "3",
                "text": "A computer virus that deletes files"
              },
              {
                "value": "4",
                "text": "A hacking method used to overload servers"
              }
            ]
          }
        ]
      },
      {
        "name": "page2",
        "title": "Section 2: Identifying and Preventing Cybercrime",
        "elements": [
          {
            "type": "radiogroup",
            "name": "question5",
            "title": "What is the best way to ensure the security of your online accounts?",
            "choices": [
              {
                "value": "2",
                "text": "Use the same password for all accounts (0 points)"
              },
              {
                "value": "3",
                "text": "Share your password with friends for safekeeping"
              },
              {
                "value": "10",
                "text": "Use strong, unique passwords and enable two-factor authentication"
              },
              {
                "value": "4",
                "text": "Avoid using passwords altogether"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question6",
            "title": "Which of the following is a sign of an online scam?",
            "choices": [
              {
                "value": "2",
                "text": "Being asked to pay upfront for a \"guaranteed\" prize"
              },
              {
                "value": "3",
                "text": "Receiving an email from a legitimate-looking address asking for personal details"
              },
              {
                "value": "4",
                "text": "Receiving a message with poor grammar and an urgent tone"
              },
              {
                "value": "10",
                "text": "All of the above"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question7",
            "title": "If you encounter a suspicious link, what should you do?",
            "choices": [
              {
                "value": "2",
                "text": "Click it to see where it goes"
              },
              {
                "value": "3",
                "text": "Ignore it and delete it immediately"
              },
              {
                "value": "4",
                "text": "Report it to the platform or website administrator"
              },
              {
                "value": "10",
                "text": "Both b and c"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question8",
            "title": "What should you avoid doing to minimize risks of cyberbullying?",
            "choices": [
              {
                "value": "2",
                "text": "Engaging in online arguments"
              },
              {
                "value": "3",
                "text": "Sharing personal information publicly"
              },
              {
                "value": "4",
                "text": "Ignoring threatening or harassing messages"
              },
              {
                "value": "10",
                "text": "All of the above"
              }
            ]
          }
        ]
      },
      {
        "name": "page3",
        "title": "Section 3: Reporting and Responding to Cybercrime",
        "elements": [
          {
            "type": "radiogroup",
            "name": "question9",
            "title": "What is the first step you should take if you are a victim of cybercrime?",
            "choices": [
              {
                "value": "2",
                "text": "Ignore it and hope it goes away"
              },
              {
                "value": "10",
                "text": "Gather evidence (e.g., screenshots, chat logs)"
              },
              {
                "value": "3",
                "text": "Report the incident to friends on social media"
              },
              {
                "value": "4",
                "text": "Change your email password"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question10",
            "title": "Where can you officially report cybercrime incidents in the Philippines?",
            "choices": [
              {
                "value": "2",
                "text": "Barangay Hall"
              },
              {
                "value": "3",
                "text": "Police Station"
              },
              {
                "value": "10",
                "text": "NBI Cybercrime Division or PNP Anti-Cybercrime Group"
              },
              {
                "value": "4",
                "text": "All of the above"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question11",
            "title": "What is the importance of reporting cybercrime?\n",
            "choices": [
              {
                "value": "2",
                "text": "To seek justice and hold offenders accountable"
              },
              {
                "value": "3",
                "text": "To raise awareness and prevent future incidents"
              },
              {
                "value": "4",
                "text": "To help improve laws and policies on cybercrime"
              },
              {
                "value": "10",
                "text": "All of the above"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question12",
            "title": "If you witness someone being cyberbullied, what is the best course of action?",
            "choices": [
              {
                "value": "2",
                "text": "Ignore the situation to avoid getting involved"
              },
              {
                "value": "3",
                "text": "Join in to protect yourself"
              },
              {
                "value": "10",
                "text": "Offer support to the victim and report the behavior"
              },
              {
                "value": "4",
                "text": "Share the incident online to raise awareness"
              }
            ]
          }
        ]
      },
      {
        "name": "page4",
        "title": "Section 4: Practical Scenarios and Decision-Making",
        "elements": [
          {
            "type": "radiogroup",
            "name": "question13",
            "title": "You receive an email from your bank asking for your account password to \"verify your identity.\" What should you do?",
            "choices": [
              {
                "value": "2",
                "text": "Reply with the information immediately"
              },
              {
                "value": "10",
                "text": "Call your bank using their official hotline to verify the request"
              },
              {
                "value": "3",
                "text": "Ignore the email"
              },
              {
                "value": "4",
                "text": "Forward the email to your friends for advice"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question14",
            "title": "A friend tells you they won an online raffle but needs your account to claim the prize. What should you do?",
            "choices": [
              {
                "value": "2",
                "text": "Give them access to your account"
              },
              {
                "value": "10",
                "text": "Ask them for more details about the raffle"
              },
              {
                "value": "3",
                "text": "Warn them it could be a scam and suggest verifying its legitimacy"
              },
              {
                "value": "4",
                "text": "Ignore the situation"
              }
            ]
          },
          {
            "type": "radiogroup",
            "name": "question15",
            "title": "You discover unauthorized transactions in your online banking account. What is your first step?",
            "choices": [
              {
                "value": "10",
                "text": "Report the transactions to your bank immediately"
              },
              {
                "value": "2",
                "text": "Post about it on social media to warn others"
              },
              {
                "value": "3",
                "text": "Try to reverse the transactions yourself"
              },
              {
                "value": "4",
                "text": "Do nothing and wait for your bank to contact you"
              }
            ]
          }
        ]
      },
      {
        "name": "page5",
        "title": "Last Question:",
        "elements": [
          {
            "type": "radiogroup",
            "name": "question16",
            "title": "Why is cybersecurity awareness critical in the Philippines, especially in the digital age?",
            "choices": [
              {
                "value": "2",
                "text": "To ensure safe and secure online transactions"
              },
              {
                "value": "3",
                "text": "To protect personal and financial information from cyber threats"
              },
              {
                "value": "4",
                "text": "To help combat the rising number of cybercrime cases and hold perpetrators accountable"
              },
              {
                "value": "10",
                "text": "All of the above"
              }
            ]
          }
        ]
      }
    ]
  }

const customTheme = {
  "themeName": "solid",
  "colorPalette": "light",
  "isPanelless": false,
  "backgroundImage": "",
  "backgroundOpacity": 1,
  "backgroundImageAttachment": "scroll",
  "backgroundImageFit": "cover",
  "cssVariables": {
      "--sjs-corner-radius": "12px",
      "--sjs-base-unit": "8px",
      "--sjs-shadow-small": "0px 2px 0px 0px rgba(0, 0, 0, 0.2)",
      "--sjs-shadow-inner": "inset 0px 2px 0px 0px rgba(0, 0, 0, 0.1)",
      "--sjs-border-default": "rgba(0, 0, 0, 0.16)",
      "--sjs-border-light": "rgba(0, 0, 0, 0.09)",
      "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
      "--sjs-general-backcolor-dark": "rgba(243, 243, 243, 1)",
      "--sjs-general-backcolor-dim-light": "rgba(245, 245, 245, 1)",
      "--sjs-general-backcolor-dim-dark": "rgba(234, 234, 234, 1)",
      "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
      "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.43)",
      "--sjs-general-dim-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-general-dim-forecolor-light": "rgba(255, 255, 255, 0.8)",
      "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
      "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
      "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
      "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
      "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
      "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
      "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
      "--sjs-shadow-inner-reset": "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1)",
      "--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
      "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-special-green": "rgba(25, 179, 148, 1)",
      "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
      "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-special-blue": "rgba(67, 127, 217, 1)",
      "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
      "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
      "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
      "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-article-font-xx-large-textDecoration": "none",
      "--sjs-article-font-xx-large-fontWeight": "700",
      "--sjs-article-font-xx-large-fontStyle": "normal",
      "--sjs-article-font-xx-large-fontStretch": "normal",
      "--sjs-article-font-xx-large-letterSpacing": "0",
      "--sjs-article-font-xx-large-lineHeight": "64px",
      "--sjs-article-font-xx-large-paragraphIndent": "0px",
      "--sjs-article-font-xx-large-textCase": "none",
      "--sjs-article-font-x-large-textDecoration": "none",
      "--sjs-article-font-x-large-fontWeight": "700",
      "--sjs-article-font-x-large-fontStyle": "normal",
      "--sjs-article-font-x-large-fontStretch": "normal",
      "--sjs-article-font-x-large-letterSpacing": "0",
      "--sjs-article-font-x-large-lineHeight": "56px",
      "--sjs-article-font-x-large-paragraphIndent": "0px",
      "--sjs-article-font-x-large-textCase": "none",
      "--sjs-article-font-large-textDecoration": "none",
      "--sjs-article-font-large-fontWeight": "700",
      "--sjs-article-font-large-fontStyle": "normal",
      "--sjs-article-font-large-fontStretch": "normal",
      "--sjs-article-font-large-letterSpacing": "0",
      "--sjs-article-font-large-lineHeight": "40px",
      "--sjs-article-font-large-paragraphIndent": "0px",
      "--sjs-article-font-large-textCase": "none",
      "--sjs-article-font-medium-textDecoration": "none",
      "--sjs-article-font-medium-fontWeight": "700",
      "--sjs-article-font-medium-fontStyle": "normal",
      "--sjs-article-font-medium-fontStretch": "normal",
      "--sjs-article-font-medium-letterSpacing": "0",
      "--sjs-article-font-medium-lineHeight": "32px",
      "--sjs-article-font-medium-paragraphIndent": "0px",
      "--sjs-article-font-medium-textCase": "none",
      "--sjs-article-font-default-textDecoration": "none",
      "--sjs-article-font-default-fontWeight": "400",
      "--sjs-article-font-default-fontStyle": "normal",
      "--sjs-article-font-default-fontStretch": "normal",
      "--sjs-article-font-default-letterSpacing": "0",
      "--sjs-article-font-default-lineHeight": "28px",
      "--sjs-article-font-default-paragraphIndent": "0px",
      "--sjs-article-font-default-textCase": "none",
      "--sjs-general-backcolor-dim": "#10162F",
      "--sjs-primary-backcolor": "#10162F",
      "--sjs-primary-backcolor-dark": "rgba(11, 15, 32, 1)",
      "--sjs-primary-backcolor-light": "rgba(16, 22, 47, 0.1)",
      "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
      "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
      "--sjs-special-red": "rgba(229, 10, 62, 1)",
      "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)",
      "--sjs-font-surveytitle-weight": "600"
  },
  "headerView": "basic"
};


const survey = new Model(surveyJson);
survey.showCorrectAnswers = false;

survey.applyTheme(customTheme);



survey.onComplete.add((sender) => {
  const results = sender.data;
  const totalScore = 
  (results.question1 === "10" ? 10 : 0) +
  (results.question2 === "10" ? 10 : 0) +
  (results.question3 === "10" ? 10 : 0) +
  (results.question4 === "10" ? 10 : 0) +
  (results.question5 === "10" ? 10 : 0) +
  (results.question6 === "10" ? 10 : 0) +
  (results.question7 === "10" ? 10 : 0) +
  (results.question8 === "10" ? 10 : 0) +
  (results.question9 === "10" ? 10 : 0) +
  (results.question10 === "10" ? 10 : 0) +
  (results.question11 === "10" ? 10 : 0) +
  (results.question12 === "10" ? 10 : 0) +
  (results.question13 === "10" ? 10 : 0) +
  (results.question14 === "10" ? 10 : 0) +
  (results.question15 === "10" ? 10 : 0) +
  (results.question16 === "10" ? 10 : 0);
});


const handleComplete = (sender) => {
  const result = sender.data;
  const calculatedScore = Object.values(result).reduce(
    (total, value) => total + parseInt(value),
    0
  );
  setScore(calculatedScore);
  setIsCompleted(true);
};

const getScoreMessage = () => {
  if (score > 100) return "Excellent! You have a strong understanding of cybercrime awareness.";
  if (score > 60) return "Good job! You have a decent understanding, but there's room for improvement.";
  return "Keep learning! Consider reviewing cybercrime concepts and best practices.";
};

const handleTryAgain = () => {
  setIsCompleted(false);
  setScore(0);
};

return (
  <div>
    {!isCompleted ? (
      <Survey model={survey} onComplete={handleComplete} />
    ) : (
      <div className="try-again-container">
        <h3 className="try-again-message">{getScoreMessage()}</h3>
        <button className="try-again-button" onClick={handleTryAgain}>
          Try Again
        </button>
      </div>
    )}
  </div>
);
};

export default AssessmentForm;