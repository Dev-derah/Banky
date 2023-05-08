
const SideBar = (props) => {
  return (
    <div className="dashboard">
      <div style={{ width: "20%" }}><p>SideBar</p></div>
      <div style={{ width: "80%" }}>{props.children}</div>
    </div>
  );
}

export default SideBar