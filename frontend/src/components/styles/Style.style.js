import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const Style = {
  Nav: styled.div`
    background: lightseagreen;
    position: fixed;
    left: 0;
    width: 220px;
    height: 100vh;
    color: #1d1d1d;

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0 30px 0;
    }

    h3 {
      font-size: 1rem;
      font-weight: bolder;
      margin: 25px 0 10px 15px;
    }
  `,

  Container: styled.div`
    background: lightseagreen;
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 50px;
    min-height: 80vh;
    border-radius: 20px;
    padding: 20px;
  `,

  Row: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 1.5rem;
      color: #1d1d1d;
    }
  `,

  Buttons: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;

    div {
      width: 290px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    button {
      cursor: pointer;
      width: 135px;
      padding: 8px 0;
      border: 1px solid #4b4b4b;
      border-radius: 5px;
    }
  `,

  InputField: styled.div`
    margin-top: 30px;
    width: 300px;

    label {
      color: #4b4b4b;
      display: block;
      font-size: 0.9rem;
      margin-bottom: 5px;
    }
    input,
    select {
      outline: none;
      width: 100%;
      font-size: 1rem;
      padding: 7px 10px;
      border-radius: 20px;
      border: 1px solid #4b4b4b;
    }
    select {
      width: 100%;
    }
  `,

  SLink: styled(NavLink)`
    padding: 10px 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #1d1d1d;

    svg {
      font-size: 1.2rem;
      margin-right: 10px;
    }
    :hover {
      cursor: pointer;
      background: #3bd5ff;
    }
    &.active {
      background: yellowgreen;
    }
  `,

  SButton: styled(Link)`
    padding: 12px 18px;
    background: #00bfff;
    border-radius: 20px;
    text-decoration: none;
    font-size: 0.9rem;
    color: #1d1d1d;
    font-weight: bold;
  `,

  STable: styled.table`
    width: 100%;
    border-collapse: collapse;
    padding: 0px;
    margin-top: 40px;

    td,
    th {
      border: 1px solid #1d1d1d;
      padding: 8px 10px;
    }
    tr:hover {
      background: lightblue;
    }
    .android {
      color: green;
      svg {
        margin-right: 7px;
      }
    }
    .actions {
      .pen,
      .cross {
        cursor: pointer;
      }
      .pen {
        color: #c49234;
        margin-right: 25px;
      }
      .cross {
        color: #c43f3f;
      }
    }
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
    padding: 0px;
    margin-top: 40px;

    td,
    th {
      padding: 8px 10px;
      text-align: left;
    }
    th {
      border-bottom: 2px solid black;
    }
    tbody tr:hover {
      cursor: pointer;
      background: lightblue;
    }
    a {
      width: 100%;
      display: block;
      text-decoration: none;
      color: black;
    }
  `,

  Graph: styled.div`
    width: 100%;
    position: relative;

    img {
      width: 100%;
    }
    div {
      border: 1px solid blue;
      position: absolute;
      top: 16%;
      left: 2.75%;
      width: 96.85%;
      height: 83%;
    }
  `,
};
