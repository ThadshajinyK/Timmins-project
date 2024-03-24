const Card = (props) => {
  return (
    <div className="card">
      <img src={props.courseImg} className="card-img-top" alt={props.courseName} />
      <div className="card-body">
        <h5 className="card-title">{props.courseName}</h5>
        <p className="card-text">
          {props.Desc}</p>
      </div>
    </div>
  );
};

export default Card;
