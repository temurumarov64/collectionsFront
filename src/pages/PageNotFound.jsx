import NavScroll from "../components/Navbar";

function NotFound() {
  return (
    <>
      <NavScroll />
      <div
        id="text"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            lineHeight: "28px",
            textAlign: "justify",
            textJustify: "inter-word",
          }}
        >
          {" "}
          <h4>
            Sorry, the page does not exist... Please, check the URL of the page
          </h4>
        </p>
      </div>
    </>
  );
}

export default NotFound;
