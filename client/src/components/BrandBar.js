import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Context } from "..";
import DeviceStore from "../store/DeviceStore";

const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <div style={{ display: "flex" }}>
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          border={brand.id === device.selectedBrand.id ? "primary" : "info"}
          onClick={() => {
            device.setSelectedBrand(brand);
          }}
          key={brand.id}
          className="p-3 m-2"
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});
export default BrandBar;
