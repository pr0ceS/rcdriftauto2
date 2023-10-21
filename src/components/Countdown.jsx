// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { startCountdown, tick } from '../slices/countdownSlice';

// const Countdown = () => {
//   const countdown = useSelector((state) => state.countdown);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       dispatch(tick());
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(startCountdown());
//   }, [dispatch]);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
//       .toString()
//       .padStart(2, '0')}`;
//   };

//   return (
// 		<span>{formatTime(countdown)}</span>
//   );
// };

// export default Countdown;
