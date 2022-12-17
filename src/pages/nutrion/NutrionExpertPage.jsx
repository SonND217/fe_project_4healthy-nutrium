import React from "react";
import HeaderNutritionExpertManager from "../../components/header/HeaderNutritionExpertManager";
import SlidebarNutrionExp from "./SlidebarNutrionExp";
import NutriongExpertInformation from "./NutrionExpertInformation";
import NutrionExpertIngredients from "./NutrionExpertIngredients";
import NutrionExpertFood from "./NutrionExpertFood";

function NutrionExpertPage({ user,changePage }) {
  let body = (
    <>
      {/* {changePage === "information" && <NutriongExpertInformation />} */}
      {/* {changePage === "" && <NutriongExpertInformation />} */}
      {changePage === "food" && <NutrionExpertFood />}
      {changePage === "ingredients" && <NutrionExpertIngredients />}
    </>
  );
  return (
    <div>
      <HeaderNutritionExpertManager
        title={"Trang Chuyên gia dinh dưỡng"} user ={user}
      ></HeaderNutritionExpertManager>
      <SlidebarNutrionExp>{body}</SlidebarNutrionExp>
    </div>
  );
}

export default NutrionExpertPage;
