import { useDispatch, useSelector } from "react-redux";
import { incrementCartVal } from "./cartValueSlice";
import { removeCarts } from "./wishListSlice";
import "./flipkart.css"
const WishList = () => {
  const { showWish } = useSelector((state) => state.wishList);
  const myDispatchWishList = useDispatch();
  return (
    <>
      {showWish.map((items) => {
        return (
          <div className="wishlistcart"
          >
            <p>Name :{items.title}</p>
            <p> Price :{items.price}</p>
            <img
              style={{ width: "80px", marginRight: "18px" }}
              src={items.image}
              alt=""
            />
            <button
              onClick={() =>
                myDispatchWishList(
                  incrementCartVal({
                    title: items.title,
                    price: items.price,
                    id: items.id,
                    image: items.image,
                  })
                )
              }
            >
              Add To Cart
            </button>

            <button
              style={{ marginLeft: "12px" }}
              onClick={() => myDispatchWishList(removeCarts(items.id))}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
};
export default WishList;