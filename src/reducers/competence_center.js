const initialState = {
  courses: null,
  tests: null,
  test: null,
  user: null,
  token: null,
  currentUser: null
};

export const competenceCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COURSES_SUCCESS":
      return {
        ...state,
        courses: action.payload
      };
    case "GET_TESTS_SUCCESS":
      return {
        ...state,
        tests: action.payload
      };
    case "GET_QUERY_TEST_SUCCESS":
      return {
        ...state,
        test: action.payload
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: action.payload
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload
      };
    case "GET_MY_INFO_SUCCESS":
      return {
        ...state,
        currentUser: action.payload
      }  
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
        token: null
      }  
    default:
      return state;
  }
};
