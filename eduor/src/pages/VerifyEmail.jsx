import React from "react";

const VerifyEmail = () => {
  let link = window.location.href;
  let nlink = link.replace("localhost:3000", "localhost:4000");
  console.log("new", nlink);

  const onSubmit = () => {
    console.log("hii");
    // console.log("details", email,password);
    fetch(nlink, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
        if (data.status === "OK") {
          alert("Verification successful");
          window.location.href = "/";
        } 
        else {
          if (data.status.code === 11000) {
            alert("Email already verified, Please login");
            window.location.href = "/";
            console.log(data.status);
          }
        else {
            alert(data.data.message);
          }
        }
      });
  };

  return (
    <div className="flex justify-center items-center w-full py-10">
      <div className="flex flex-col items-center w-2/5  bg-bgcolor-600 rounded-md p-12">
        <p className="head">Welcome To Eduor!</p>
        <p className="para">Please verify your email</p>

        <button
          className="btn mt-5 px-10"
          type="submit"
          onClick={() => onSubmit()}
        >
          Verify and Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;