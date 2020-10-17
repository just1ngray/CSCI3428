/** TODO: LOGIN PAGE 
 *  Simple button route similar to old app.
*/

import { useRouter } from 'next/router';
import CustomButton from "./components/CustomButton";
import PageTitle from "./components/PageTitle";

export default function () {
  const r = useRouter(); // Routes inside functions.
  
  function handleRouteClick(route) {
    r.push(route);
  }

  return (
    <div>
      <div>
        <PageTitle title="TODO LOGIN PAGE HERE" />{" "}
        {/* is user_id the from._id */}
      </div>
      <div>
        <span>
          <CustomButton
            label="Student"
            onClick={() => handleRouteClick("/StudentHome")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="Supervisior"
            onClick={() => handleRouteClick("/AdminHome")}
            type="button"
            disabled={false}
          />
          <CustomButton
            label="DEBUG: ViewEmail"
            onClick={() => handleRouteClick("/ViewEmail")}
            type="button"
            disabled={false}
          />
        </span>
      </div>
    </div>
  );
}