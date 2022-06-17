import moment from "moment"

const UserListAdmin = ({ users }) => {
  users.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  return (
    <table className="table table-striped  table-responsive-sm">
      <thead className="thead-dark">
        <tr>
          <th>Nimi</th>
          <th>Email</th>
          <th>Luotu</th>
          <th>Myyjä</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              {u.firstname} {u.lastname}
            </td>
            <td>{u.email}</td>
            <td>{moment(u.created_at).format("DD/MM/YYYY")}</td>

            <td>{u.is_seller ? "X" : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// const EventListItemAdmin = ({ event }) => {
//   const [show, setShow] = useState(false)
//   return (
//     <Card className="mb-1 py-2 px-2">
//       <Button onClick={() => setShow(true)}>Muokkaa</Button>
//       {/* <EventInfoLabelAdmin event={event} classes="mb-0" omitDate={true} /> */}
//       {show ? <EventForm setShow={setShow} event={event} /> : null}
//     </Card>
//   )
// }
// const EventForm = ({ setShow, event }) => {
//   const validationSchema = Yup.object().shape({
//     starting_time: Yup.string().required("Vaadittu"),
//     end_time: Yup.string().required("Vaadittu"),
//     date: Yup.string().required("Vaadittu"),
//   })
//   const [markets, setMarkets] = useState([
//     { id: 10, address: "Ståhlentie 14, espoo", type: "reko_market" },
//     { id: 21, address: "Hämeentie 1", type: "reko_market" },
//   ])

//   return (
//     <Col xs={12}>
//       <Formik
//       >
//         {() => (
//           <Form>
//             <Row>
//               <UserFormDetails />

//             </Row>
//             <Button
//               variant="danger"
//               onClick={() => {
//                 setShow(false)
//               }}
//             >
//               Peruuta
//             </Button>
//             <Button type="submit">Päivitä</Button>
//           </Form>
//         )}
//       </Formik>
//     </Col>
//   )
// }

// const UserFormDetails = () => {
//   users.map((u)=>{
//     return (
//       <Col xs={12} className="mb-5">
//         <Field
//           name="name"
//           id="userName"
//           label="Nimi"
//           value={u.firstname + " " + u.lastname}
//           component={FormFieldText}
//         />

//         <Field
//           name="email"
//           id="userEmail"
//           label="Sähköposti"
//           value={u.email}
//           component={FormFieldText}
//         />

//       </Col>
//     )
//   })

// }

// const EventInfoLabelAdmin = ({ event }) => {
//   const startDate = moment(event.start)
//   const endDate = moment(event.endtime)

//   const weekdays = [
//     "Sunnuntai",
//     "Maanantai",
//     "Tiistai",
//     "Keskiviikko",
//     "Torstai",
//     "Perjantai",
//     "Lauantai",
//   ]

//   const startTime =
//     startDate.hours() +
//     ":" +
//     (startDate.minutes() < 10 ? "0" + startDate.minutes() : startDate.minutes())
//   const endTime =
//     endDate.hours() +
//     ":" +
//     (endDate.minutes() < 10 ? "0" + endDate.minutes() : endDate.minutes())

//   const startDay = weekdays[startDate.day()]

//   return (
//     <div>
//       <p>
//         {startDay} {startDate.date() + "." + (startDate.month() + 1)}
//       </p>
//       <p>
//         {startTime}-{endTime}
//       </p>
//     </div>
//   )
// }

export default UserListAdmin
