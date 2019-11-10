const initialState = {
  courses: null,
  tests: null,
  test: null,
  user: null,
  token: null,
  currentUser: null,
  test_chart: null,
  test_pie_chart: null,
  results: null
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
    case 'OPEN_TEST_QUESTIONS_SUCCESS':
      return {
        ...state,
        test: action.payload
      }
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
        currentUser: null,
        token: null
      }  
    case 'GET_TEST_CHART_SUCCESS':
      return {
        ...state,
        test_chart: action.payload
      }
    case 'GET_TEST_PIE_CHART_SUCCESS':
      return {
        ...state,
        test_pie_chart: action.payload
      } 
    case 'GET_TESTS_RESULTS_SUCCESS':
      return {
        ...state,
        results: action.payload
      }
    default:
      return state;
  }
};
