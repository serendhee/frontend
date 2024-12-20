import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPolicyById, modifyPolicy } from "./WelfareApi"; // API 함수 임포트
import Swal from "sweetalert2";

const WelfarePolicyDetailModify = () => {
  const navigate = useNavigate();
  const { id: policyId } = useParams(); // URL에서 policyId 추출

  const [policy, setPolicy] = useState({
    policyId: policyId,
    policyName: "",
    policyOverview: "",
    policyContent1: "",
    supportScale: "",
    policyOperatePeriod: "",
    policyDateType: "",
    policyApplicationPeriod: "",
    applicationProcedure: "",
    judgingPresentation: "",
    applicationSite: "",
    submitionDocument: "",
    ageRequirement: "",
    proposerRequirement: "",
    academicBackground: "",
    majorIn: "",
    employmentStatus: "",
    additionalRequirement: "",
    participationRestriction: "",
    hostOrganization: "",
    hstOrgManagerName: "",
    hstOrgManagerPhone: "",
    operatingAgency: "",
    operAgenManagerName: "",
    operAgenManagerPhone: "",
    referenceSite1: "",
    referenceSite2: "",
    etc: "",
  });

  useEffect(() => {
    fetchPolicyById(policyId).then((data) => setPolicy(data));
  }, [policyId]);

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickModify = () => {
    //버튼 클릭시
    Swal.fire({
      icon: "warning",
      title: "수정",
      text: `[${policy.policyName}] 정책을 수정 하시겠습니까??`,
      showCancelButton: true,
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        modifyPolicy(policy.policyId, policy)
          .then((data) => {
            console.log("modify result: " + data);
            Swal.fire({
              icon: "success",
              title: "수정되었습니다.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(`/youth/welfare/${policy.policyId}`, {
              state: { updated: true },
            }); //수정한 상세 페이지로 이동하면서 상태 전달
          })
          .catch((error) => {
            console.error("Failed to modify policy:", error);
            Swal.fire({
              icon: "error",
              title: "정책 수정에 실패했습니다.",
              text: error.message,
            });
          });
      } else {
        // 취소
        Swal.fire({
          icon: "info",
          title: "수정이 취소되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const renderInputField = (name, value, label, isTextarea = false) => (
    <tr className="border-b">
      <td className="font-semibold w-1/4 py-2">{label}</td>
      <td className="h-full py-2">
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full p-2 outline-none border rounded resize-none h-full"
            style={{ minHeight: "100%" }} // 부모의 높이에 맞춤
            rows="3"
          ></textarea>
        ) : (
          <input
            name={name}
            type="text"
            value={value}
            onChange={handleChange}
            className="w-full p-2 outline-none border rounded h-full"
            style={{ minHeight: "100%" }} // 부모의 높이에 맞춤
          />
        )}
      </td>
    </tr>
  );

  return (
    <div className="guide-line">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-b-gray-200">
        청년 복지 정책
      </h1>
      {/* <div className="w-[70%] h-[600px] ml-[15%]  border-2 border-red-600"> */}

      <div className="w-full bg-white p-8 rounded-md shadow-md border">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">정책 수정</h3>
        {/* 정책명 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            정책명
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              {renderInputField(
                "policyName",
                policy.policyName,
                "정책명",
                true
              )}
              {renderInputField(
                "policyOverview",
                policy.policyOverview,
                "정책소개",
                true
              )}
            </tbody>
          </table>
        </div>
        {/* 정책 설명 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            정책 설명
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              {renderInputField(
                "policyContent1",
                policy.policyContent1,
                "지원내용",
                true
              )}
              {renderInputField(
                "policyApplicationPeriod",
                policy.policyApplicationPeriod,
                "사업신청기간",
                true
              )}
              {renderInputField(
                "supportScale",
                policy.supportScale,
                "지원 규모",
                true
              )}
            </tbody>
          </table>
        </div>
        {/* 지원 대상 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            지원 대상
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              {renderInputField(
                "ageRequirement",
                policy.ageRequirement,
                "연령"
              )}
              {renderInputField(
                "proposerRequirement",
                policy.proposerRequirement,
                "거주지 및 소득",
                true
              )}
              {renderInputField(
                "academicBackground",
                policy.academicBackground,
                "학력"
              )}
              {renderInputField("majorIn", policy.majorIn, "전공")}
              {renderInputField(
                "employmentStatus",
                policy.employmentStatus,
                "취업상태",
                true
              )}
              {renderInputField(
                "additionalRequirement",
                policy.additionalRequirement,
                "추가 세부 사항",
                true
              )}
              {renderInputField(
                "participationRestriction",
                policy.participationRestriction,
                "참여제한대상",
                true
              )}
            </tbody>
          </table>
        </div>
        {/* 신청 방법 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            신청 방법
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              {renderInputField(
                "applicationProcedure",
                policy.applicationProcedure,
                "신청방법 및및 절차",
                true
              )}
              {renderInputField(
                "judgingPresentation",
                policy.judgingPresentation,
                "심사 및 발표",
                true
              )}
              {renderInputField(
                "applicationSite",
                policy.applicationSite,
                "신청 사이트",
                true
              )}
              {renderInputField(
                "submitionDocument",
                policy.submitionDocument,
                "제출서류",
                true
              )}
            </tbody>
          </table>
        </div>
        {/* 추가 정보 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            추가 정보
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              {renderInputField(
                "hostOrganization",
                policy.hostOrganization,
                "주관기관"
              )}
              {renderInputField(
                "hstOrgManagerPhone",
                policy.hstOrgManagerPhone,
                "주관기관 연락처"
              )}
              {renderInputField(
                "operatingAgency",
                policy.operatingAgency,
                "운영기관"
              )}
              {renderInputField(
                "operAgenManagerPhone",
                policy.operAgenManagerPhone,
                "운영기관 연락처"
              )}
              {renderInputField(
                "referenceSite1",
                policy.referenceSite1,
                "참고사이트1",
                true
              )}
              {renderInputField(
                "referenceSite2",
                policy.referenceSite2,
                "참고사이트2",
                true
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full text-right">
          <button
            onClick={() => {
              handleClickModify();
            }}
            className="w-1/12 py-3 me-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
          >
            수정 완료
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-1/12 py-3 ms-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
          >
            수정 취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelfarePolicyDetailModify;
