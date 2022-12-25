import {
  Table,
  Button,
  message,
  Tag,
  Image,
  Popconfirm,
  Space,
  Breadcrumb,
  Modal,
  Input,
} from "antd";
import React, { useState, useEffect } from "react";
import HeaderLayout from "../../components/header/HeaderNutritionExpertManager";
import "../../assets/style/admin/style.css";
import SelectionFoods from "../../components/selection/SelectionFoods";
import SelectionCategories from "../../components/selection/SelectionCategories";
import SelectionMealtypeFoodFilter from "../../components/selection/SelectionMealtypeFoodFilter";
import SelectionSeasonFood from "../../components/selection/SelectionSeasonFood";
import AddNewIngrendient from "../../components/drawn/AddNewIngrendient";
import SelectionSeasonIngredient from "../../components/selection/SelectionSeasonIngredient";
import EditIngrdient from "../../components/drawn/EditIngrdient";
import IngredientAPI from "../../service/Actions/IngredientAPI";
import FoodAPI from "../../service/Actions/FoodAPI";
import AlertMessage from "../../../src/components/alert/AlertMessage";

const text = "Nguyên Liệu này sẽ được xoá khỏi danh sách?";

function NutrionExpertIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [alert, setAlert] = useState(null);

  const loadIngredientList = async () => {
    await IngredientAPI.getAll()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    loadIngredientList();
  }, []);

  const changeStatus = async (id) => {
    await IngredientAPI.changeStatus(id)
      .then((res) => {
        setAlert({
          type: "success",
          message: "Cập nhật trạng thái nguyên liệu thành công",
        });
        setTimeout(() => setAlert(null), 5000);
        loadIngredientList();
      })
      .catch((e) => {
        setAlert({
          type: "danger",
          message: e.response
            ? e.response.data.message
            : "Lỗi cập nhật trạng thái nguyên liệu",
        });
        setTimeout(() => setAlert(null), 5000);
      });
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   justify: "center",
    // },
    {
      title: "Tên Nguyên Liệu",
      dataIndex: "ingredientName",
      justify: "center",
      width: 100,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageIngredient) => {
        return <Image width={80} height={60} src={imageIngredient} />;
      },
      justify: "center",
      width: 100,
    },
    // {
    //   title: "Giới hạn tối thiểu",
    //   dataIndex: "minLimit",
    //   justify: "center",
    //   width: 75
    // },
    // {
    //   title: "Giới hạn tối đa",
    //   dataIndex: "maxLimit",
    //   justify: "center",
    //   width: 75
    // },
    {
      title: "Mùa",
      dataIndex: "seasson_id",
      justify: "center",
      width: 75,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      justify: "center",
      render: (status) => (
        <>
          {status ? (
            <Tag color="green">Đã kích hoạt </Tag>
          ) : (
            <Tag color="red">Vô hiệu hoá</Tag>
          )}
        </>
      ),
      width: 120,
    },
    {
      title: "Chất béo (g)",
      dataIndex: "fat",
      justify: "center",
      width: 66,
    },
    {
      title: "Chất đạm (g)",
      dataIndex: "protein",
      justify: "center",
      width: 68,
    },
    {
      title: "Chất bột đường (g)",
      dataIndex: "carb",
      justify: "center",
      width: 80,
    },
    {
      title: "Calo (Kcal)",
      dataIndex: "calo",
      justify: "center",
      width: 73,
    },
    {
      title: "Nước(g)",
      dataIndex: "water",
      justify: "center",
      width: 80,
    },
    {
      title: "Chất xơ(g)",
      dataIndex: "fiber",
      justify: "center",
      width: 80,
    },
    {
      title: "Tro(g)",
      dataIndex: "ash",
      justify: "center",
      width: 80,
    },
    {
      title: "Canxi(mg)",
      dataIndex: "canxi",
      justify: "center",
      width: 80,
    },
    {
      title: "Iron(mg)",
      dataIndex: "iron",
      justify: "center",
      width: 80,
    },
    {
      title: "Zinc(mg)",
      dataIndex: "zinc",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminC(mg)",
      dataIndex: "vitaminC",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminB1(mg)",
      dataIndex: "vitaminB1",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminB2(mg)",
      dataIndex: "vitaminB2",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminB3(mg)",
      dataIndex: "vitaminB3",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminB6A(mg)",
      dataIndex: "vitaminB6A",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminD(mg)",
      dataIndex: "vitaminD",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminB12(mcg)",
      dataIndex: "vitaminB12",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminA(mcg)",
      dataIndex: "vitaminA",
      justify: "center",
      width: 80,
    },
    {
      title: "VitaminA_rae(mcg)",
      dataIndex: "vitaminARae",
      justify: "center",
      width: 80,
    },
    {
      title: "Chỉnh sửa",
      render: (_, record) => (
        <EditIngrdient
          ingredient={record}
          loadIngredientList={loadIngredientList}
        ></EditIngrdient>
      ),
      fixed: "right",
      width: 70,
    },
    {
      title: "Đổi trạng thái",
      dataIndex: "",
      render: (_, record) => (
        <>
          <Button
            // type="primary"
            onClick={() => {
              changeStatus(record.id);
            }}
            style={{ backgroundColor: "green", border: "none", color: "white" }}
          >
            Kích hoạt/Vô hiệu hóa
          </Button>
        </>
      ),
      justify: "center",
      fixed: "right",
      width: 120,
    },
  ];

  const data = [];
  ingredients
    ? ingredients.map((ingredientValue) =>
        data.push({
          id: ingredientValue.id,
          ingredientName: ingredientValue.ingredientName,
          minLimit: ingredientValue.minLimit,
          maxLimit: ingredientValue.maxLimit,
          // seasons: ingredientValue.seasons,
          seasson_id: ingredientValue.seasons.map((s) => s.seasonName + " "),
          fat: ingredientValue.fat,
          protein: ingredientValue.protein,
          carb: ingredientValue.carb,
          calo: ingredientValue.calo,
          water: ingredientValue.water,
          fiber: ingredientValue.fiber,
          ash: ingredientValue.ash,
          canxi: ingredientValue.canxi,
          iron: ingredientValue.iron,
          zinc: ingredientValue.zinc,
          vitaminC: ingredientValue.vitaminC,
          vitaminB1: ingredientValue.vitaminB1,
          vitaminB2: ingredientValue.vitaminB2,
          vitaminB3: ingredientValue.vitaminB3,
          vitaminB6A: ingredientValue.vitaminB6A,
          vitaminD: ingredientValue.vitaminD,
          vitaminB12: ingredientValue.vitaminB12,
          vitaminA: ingredientValue.vitaminA,
          vitaminARae: ingredientValue.vitaminARae,
          image: `http://localhost:8080/ingredient/${ingredientValue.id}/image`,
          status: ingredientValue.status,
          img: ingredientValue.img,
        })
      )
    : console.log("error");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Tìm kiếm người dùng
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  return (
    <div>
      {/* đường dẫn */}
      <Breadcrumb
        style={{
          paddingLeft: "10px",
          paddingTop: "5px",
          paddingBottom: "10px",
        }}
      >
        <Breadcrumb.Item>
          <a href="">Trang chuyên gia dinh dưỡng</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách nguyên liệu</Breadcrumb.Item>
      </Breadcrumb>
      <div className="wrapper__listUser">
        <div className="add_new_user__listUser">
          <AddNewIngrendient
            loadIngredientList={loadIngredientList}
          ></AddNewIngrendient>
        </div>
        <div className="search_user___listUser">
          <Search
            placeholder="Nhập tên nguyên liệu bạn cần phải tìm"
            allowClear
            enterButton="Tìm Kiếm"
            size="large"
            onSearch={onSearch}
          />
        </div>
        Lọc theo mùa
        <div style={{ paddingTop: 0 }}>
          <SelectionSeasonIngredient></SelectionSeasonIngredient>
        </div>
      </div>
      <div className="wrapper__listUser">
        <AlertMessage info={alert} />
      </div>

      {/* thông tin tài khoản người dùng */}
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 3700,
          y: 500,
        }}
        expandable={{
          columnWidth: "auto",
          columnTitle: "auto",
        }}
      />
    </div>
  );
}

export default NutrionExpertIngredients;
