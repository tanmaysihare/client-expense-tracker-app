import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
function DownloadPage() {
  const token =
    useSelector((state) => state.Auth.token) || localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  const [downloadUrlList, setDownloadUrlList] = useState([]);
  const [generateUrl, setGenerateUrl] = useState(false);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await Axios.get("http://localhost:3001/expense", {
          headers: { "access-token": token },
        });
        setExpenses(res.data);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchExpenses();
  }, [token]);

  const fetchDownloadUrlListHandler = async () => {
    try {
      const res = await Axios.get(
        "http://localhost:3001/download/download-url-list",
        {
          headers: { "access-token": token },
        }
      );
      // console.log(res.data.downloads);
      setDownloadUrlList(res.data.downloads);
      setGenerateUrl(true);
    } catch (error) {
      toast.error(error);
    }
  };
  const downloadUrlHandler = async (e) => {
    const link = document.createElement("a");
    link.href = e.target.value;
    console.log(e.target.value);
    link.setAttribute("download", "MonthlyExpenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const downloadHandler = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/download/download-expenses",
        { headers: { "access-token": token } }
      );

      if (response.status === 200) {
        const link = document.createElement("a");
        link.href = response.data.fileUrl;
        // console.log(response.data.fileUrl);
        link.setAttribute("download", "MonthlyExpenses.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  //console.log("generate download list", downloadUrlList);
  return (
    <div>
      <div className="container mt-6 mb-5 has-text-centered">
        <div className="box">
          <div className="title is-5">Monthly Expense</div>
          <div className="grid">
            <div className="cell">Date</div>
            <div className="cell">Description</div>
            <div className="cell">Category</div>
            <div className="cell">Expense</div>
          </div>
          {expenses.map((value, key) => {
            return (
              <div className="grid box" key={key}>
                <div className="cell">{value.createdAt}</div>
                <div className="cell">{value.description}</div>
                <div className="cell">{value.category}</div>
                <div className="cell">{value.money}</div>
              </div>
            );
          })}
        </div>
        <div className="box">
          <div className="title is-5">Yearly Expense</div>
          <div className="grid">
            <div className="cell">Month</div>
            <div className="cell">Expense</div>
          </div>
          {expenses.map((value, key) => {
            return (
              <div className="grid box" key={key}>
                <div className="cell">{value.createdAt}</div>
                <div className="cell">{value.money}</div>
              </div>
            );
          })}
        </div>

        <div className="grid ">
          <div className="cell">
            <button onClick={downloadHandler} className="button is-success">
              Download
            </button>
          </div>
          <div className="cell">
            <button
              onClick={fetchDownloadUrlListHandler}
              className="button is-success"
            >
              Click To Generate<br/> previous Download List
            </button>
          </div>
        </div>
        {generateUrl && (
          <div
            className=" box column
            is-three-quarters-mobile
            is-two-thirds-tablet
            is-half-desktop
            is-one-third-widescreen
            is-one-quarter-fullhd
          "
          >
            <div className="title is-5">Yearly Expense</div>
            <div className="grid">
            <div className="cell">Download Date</div>
            <div className="cell">Download Url</div>
          </div>
          {downloadUrlList.map((value, key) => {
            return (
              <div className="grid box" key={key}>
                <div className="cell">{value.createdAt}</div>
                <div className="cell">
                  <button
                    onClick={downloadUrlHandler}
                    value={value.link}
                    className="button is-success"
                  >
                    Download
                  </button>
                </div>
              </div>
            );
          })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadPage;
