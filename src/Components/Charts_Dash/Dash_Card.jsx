import React from "react";
// ------------------------------
const Dash_Card = ({
  Title,
  Amount,
  CardLeftColor,
  CardTextColor,
  icons,
}) => {
  // ------------------------------
  return (
    <>
      {/*Features Available Card*/}
      <div className="col-md-3 mb-4">
        <div className={`card border-left-${CardLeftColor} shadow h-100 py-2`}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div
                  className={`text-xs font-weight-bold text-${CardTextColor} text-uppercase mb-1`}
                  style={{ "fontFamily": "Marcellus, serif","fontWeight": "bold","letterSpacing":"1px"}}
                >
                  {Title}
                </div>
                <div className="h5 mb-0 fontWeight-bold text-gray-800">
                  {Amount}
                </div>
              </div>
              <div className="col-auto">{icons}</div>
            </div>
          </div>
        </div>
      </div>
       {/*END of Features Available Card*/}
    </>
  );
};

export default Dash_Card;
