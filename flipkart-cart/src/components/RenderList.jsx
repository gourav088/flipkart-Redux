import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {decrementQuantity,handleClearCart,incrementCartVal,incrementQuantity,removeCart,} from "./cartValueSlice";
import { handleWishList } from "./wishListSlice";

const RenderList = () => {
  const [list, setList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const { cartValue, addCartList, totalAmount } = useSelector(
    (state) => state.updateCart
  );

  const myDispatchHandleCart = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  return (
    <>
      <div>
        <div className="div1">
          <div
            style={{
              display: "flex",
              gap: 11,
              marginLeft: 800,
              marginBottom: 29,
            }}
          >
            {/* <Link to="wishlist">
              <button>WishList</button>
            </Link> */}

            <button>Cart : {cartValue}</button>
            <button>Amt : {totalAmount}</button>
            {addCartList.length > 0 ? (
              <button onClick={() => myDispatchHandleCart(handleClearCart())}>
                Clear Cart
              </button>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div>
            {list.map((item) => {
              return (
                <ul className="ulList"
                >
                  <div>
                    <img width={110} src={item.image} alt="" />
                    <li style={{ marginBottom: "7px", marginTop: "7px" }}>
                      Rs : {item.price}
                    </li>
                    <li>{item.title}</li>
                    <div style={{ display: "flex", gap: 36 }}>
                      <div>
                        <button
                          style={{ marginTop: "12px" }}
                          onClick={() =>
                            myDispatchHandleCart(
                              incrementCartVal({
                                title: item.title,
                                price: item.price,
                                id: item.id,
                                image: item.image,
                                showMsg: "",
                              })
                            )
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div style={{ position: "relative", top: 18 }}></div>
                    </div>
                    {addCartList.map((cartItem) => {
                      if (cartItem.productId === item.id) {
                        return (
                          <h4
                            style={{
                              color: "black",
                              marginBottom: -16,
                              position: "relative",
                              top: -8,
                            }}
                          >
                            {cartItem.showMsg}
                          </h4>
                        );
                      }
                    })}
                  </div>
                </ul>
              );
            })}
          </div>
          <div>
            {addCartList.map((items) => {
              return (
                <div className="rightCart">
                  <p>Name :{items.productName}</p>
                  <p> Price :{items.productPrice}</p>
                  <img
                    style={{ width: "80px", marginRight: "18px" }}
                    src={items.image}
                    alt=""
                  />
                  <button
                    onClick={() =>
                      myDispatchHandleCart(
                        incrementQuantity({
                          prices: items.productPrice,
                          id: items.productId,
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button style={{ marginLeft: "4px", marginRight: "4px" }}>
                    {items.quantity}
                  </button>
                  <button
                    onClick={() =>
                      myDispatchHandleCart(
                        decrementQuantity({
                          prices: items.productPrice,
                          id: items.productId,
                        })
                      )
                    }
                  >
                    -
                  </button>

                  <button
                    style={{ marginLeft: "12px" }}
                    onClick={() =>
                      myDispatchHandleCart(
                        removeCart({
                          id: items.productId,
                          price: items.productPrice,
                          quantity: items.quantity,
                        })
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default RenderList;
