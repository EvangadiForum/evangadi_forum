import React from 'react'
import Header from '../../components/header/Header'
import module from './askquestion.module.css'

function AskQuestion() {
  return (
      <>
          <Header />
              <div className={module.instructions}>
                  <h2>Steps to write a good question</h2>
                  <ul>
                      <li className={module.first}>Summurize your problem in a one-line title.</li>
                      <li>Describe your problem in more detail.</li>
                      <li>Describe what you tried and what you expect to happen.</li>
                      <li>Review your question and post it to the site</li>
                  </ul>
              </div>
          <div className={module.ask}>
              <h2>Ask a public question</h2>
              <p>Go to questions page</p>
              <input type="text" className={module.question} placeholder='Title' />
              <textarea type="text" className={module.description} placeholder='Question Description...' />
          </div>
          <div className={module.btn}>
              <button>Post Your Question</button>
          </div>
      </>
  )
}

export default AskQuestion