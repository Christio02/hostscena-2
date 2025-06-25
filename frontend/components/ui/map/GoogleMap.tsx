export default function GoogleMap({
  width = '100%',
  url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7270.468459692824!2d6.222245657112022!3d62.47147092082209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4616dac1b03a4a8b%3A0x5df22844dd93ce98!2sNTNU%20i%20%C3%85lesund!5e0!3m2!1sno!2sno!4v1750326406757!5m2!1sno!2sno',
}: {
  width?: string
  url?: string
}) {
  return (
    // https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7270.468459692824!2d6.222245657112022!3d62.47147092082209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4616dac1b03a4a8b%3A0x5df22844dd93ce98!2sNTNU%20i%20%C3%85lesund!5e0!3m2!1sno!2sno!4v1750326406757!5m2!1sno!2sno
    <iframe
      src={url}
      width={width}
      height="433"
      style={{ border: '2px solid' }}
      allowFullScreen={true}
      loading="lazy"
    ></iframe>
  )
}
