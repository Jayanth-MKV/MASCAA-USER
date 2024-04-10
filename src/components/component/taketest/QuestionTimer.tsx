"use client"
import React, { useEffect, useState } from 'react'

const QuestionTimer = ({timeLeft }:any) => {
    return (
      <div>
            Time Left: {Math.floor(timeLeft / 60)} minutes {timeLeft % 60} seconds
      </div>
    );
  };



  export default QuestionTimer;