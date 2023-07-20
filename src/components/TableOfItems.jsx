import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { deleteCollectionItemApi } from "../api/collectionItems";

import { FaRegArrowAltCircleRight, FaTrash } from "react-icons/fa";

function TableOfItems({ collectionItems, collectionId, fetchCollectionItems }) {
  const navigate = useNavigate();

  const deleteCollectionItem = (id) => {
    deleteCollectionItemApi(id)
      .then((res) => {
        fetchCollectionItems();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Table
        style={{ textAlign: "center" }}
        responsive="md"
        className="table-light  table-hover table-bordered card_item_review"
      >
        <thead>
          <tr>
            <th>#</th>
            <th style={{ width: "30%" }}>Name of the item</th>
            <th>Id of the collection</th>
            <th>Created at</th>
            <th style={{ width: "20px" }}>Item details</th>
            <th style={{ width: "20px" }}>Delete item</th>
          </tr>
        </thead>
        <tbody>
          {collectionItems?.length > 0 ? (
            collectionItems.map((collectionItem, key) => (
              <tr key={key}>
                <td style={{ textAlign: "center" }}>{key + 1}</td>
                <td className="table-data">{collectionItem.name}</td>
                <td className="table-data">{collectionItem.collection_id}</td>
                <td className="table-data">
                  {timeConverter(collectionItem.created_at)}
                </td>
                <td style={{ textAlign: "center" }} className="table-data">
                  <FaRegArrowAltCircleRight
                    onClick={() => navigate(`${collectionItem.id}`)}
                    className="icon"
                    color="#394867"
                  />
                </td>
                <td style={{ textAlign: "center" }} className="table-data">
                  <FaTrash
                    fontSize={14}
                    onClick={() => deleteCollectionItem(collectionItem.id)}
                    className="icon"
                    color="#394867"
                  />
                </td>
              </tr>
            ))
          ) : (
            <td
              id="text"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              New collections items will apear here...
            </td>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default TableOfItems;

export const timeConverter = (time) => {
  if (time === "0000-00-00 00:00:00") return "not available";
  let date = time?.split("T")[0];
  let t = time?.split("T")[1];
  let currentTime = t?.split(".")[0].split(":");
  return `${date} ${currentTime[0]}:${currentTime[1]}`;
};
