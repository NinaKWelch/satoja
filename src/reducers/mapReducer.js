import { SET_MAP_VIEW, SET_MAP_MARKERS, SET_CURRENT_MAP_MARKERS } from "../actions/map"

// map center and zoom
export const mapView = (state = null, action) => {
  switch (action.type) {
    case SET_MAP_VIEW:
      return action.data
    default:
      return state
  }
}

// innitial map markers
export const mapMarkers = (state = null, action) => {
  switch (action.type) {
    case SET_MAP_MARKERS:
      return action.data
    default:
      return state
  }
}

// current map markers
export const currentMapMarkers = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_MAP_MARKERS:
      return action.data
    default:
      return state
  }
}
