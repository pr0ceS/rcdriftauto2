import styled from "styled-components";

export const StyledForm = styled.form`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
  width: 400px;
  margin: 50px auto;
	padding: 30px;

  h1 {
    font-size: 24px;
		text-align: center;
  }

  p {
    margin-bottom: 20px;
		text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  label {
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 15px;
  	color: #616161;
  }

  div {
    width: 100%;
  }

  input {
    padding: 7px 8px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    &:focus {
      border-color: white;
	    outline: 2px solid var(--action);
    }
  }

  button,
  input {
		font-size: 16px;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgb(220, 220, 220);
  }

  button {
    margin-top: 12px;
  }

  p {
    font-size: 14px;
    a {
      color: var(--action);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    margin-top: 120px;
    box-shadow: none;
    width: 100%;
  }
`;
