type props = {
  params: {
    id: string;
  };
};
export default function page({ params }: props) {
  return <div>Forum ${params.id} Page </div>;
}
