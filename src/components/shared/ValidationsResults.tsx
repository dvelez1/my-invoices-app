export const ValidationsResults = ({ errors }: any) => {
  var listItems;
  if (errors?.length > 0) {
    listItems = errors.map((err: any) => <li key={err.toString()}>{err}</li>);
  } else listItems = [];

  return (
    <>
      {listItems?.length != 0 && (
        <div className="text-danger">
          <strong>Fix the following validations results:</strong>
          <ul>{listItems}</ul>
        </div>
      )}
    </>
  );
};
