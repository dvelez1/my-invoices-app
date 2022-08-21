
export const ProductsRows = ({
  ProductId,
  Name,
  Price,
  handleUpsertClick,
}: any) => {
  return (
    <tr>
      <td><div className="mt-2">{ProductId}</div></td>
      <td><div className="mt-2">{Name}</div></td>
      <td><div className="mt-2">{Price.toFixed(2)}</div></td>
      <td>
        <span className="me-md-2 ">
          <i
            title="Edit Product"
            className="bi bi-pencil-square cursor"
            style={{ fontSize: 25 }}
            onClick={() => handleUpsertClick(ProductId)}
          ></i>
        </span>
      </td>
    </tr>
  );
};
