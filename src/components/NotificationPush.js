import Toast from "react-bootstrap/Toast"

/*
Parent Component:
- the push notification should be placed apart from the main content
- set an icon and alt text for the icon
  - svg icons can be downloaded from https://icons.getbootstrap.com/ and placed in the media folder
  - remove width and height from svg
  - import a link to the file ie. import ArrowLeftIcon from "../media/arrow-left.svg"
  - send it as icon props ie. icon={ArrowLeftIcon}
  - set an alt text to describe the image: iconAlt="left arrow"
- set a timestamp for when the notified action took place in Date.now() format
- set a delay in milliseconds (5000 = 5 sec) for how long the notification should be displayed

const Parent = () => {
    const [show, setShow] = React.useState(false);

  return (
    <>
      <NotificationPush
        show={show}
        handleClose={() => setShow(false)}
        icon={icon}
        iconAlt="alt text"
        title="title"
        timeStamp={t}
        delay={ms}
      >
        push notification content goes here
      </NotificationPush>

      <div>
        Other content
      </div>
    </>
  );
*/

const NotificationPush = ({
  show,
  handleClose,
  icon,
  iconAlt,
  title,
  timeStamp,
  delay,
  children,
}) => {
  const getTime = () => {
    // time difference between the event and notification
    const timer = Math.floor((Date.now() - timeStamp) / (1000 * 60))

    if (timer > 60) {
      return "yli tunti sitten"
    } else if (timer > 1 && timer <= 60) {
      return `${timer} min sitten`
    } else {
      return "hetki sitten"
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <Toast
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          margin: "auto",
          zIndex: 10000,
        }}
        show={show}
        onClose={handleClose}
        delay={delay}
        autohide
      >
        <Toast.Header>
          <img src={icon} width="16" height="16" className="rounded mr-2" alt={iconAlt} />
          <strong className="mr-auto">{title}</strong>
          <small>{getTime()}</small>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </div>
  )
}

export default NotificationPush
