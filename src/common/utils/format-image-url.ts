interface IBlobImage {
  contentType: string;
  data: string;
}
export const formatImageUrl = ({
  responseData,
}: {
  responseData: IBlobImage;
}) => {
  return `data:${responseData.contentType};base64,${responseData.data}`;
};
