import RowView from "./RowView";
export interface IRowProps {
  label: string;
}
const RowContainer = (props: IRowProps) => {
  return <RowView {...props} />;
};

export default RowContainer;
