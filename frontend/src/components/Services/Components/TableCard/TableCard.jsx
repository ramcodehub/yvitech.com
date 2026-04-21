import "./TableCard.css";

export default function TableCard({ title, headers, data }) {
  return (
    <div className="table-card container py-4">
        <h2 className="card-title mb-3 fw-bold">{title}</h2>
      <div className="card">
        
        {/* Card Title */}
        <div className="card-body">

          {/* Table */}
          <div className="table-responsive">
            <table className="table custom-table mb-0">
              <thead>
                <tr>
                  {headers.map((head, index) => (
                    <th key={index}>{head}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.col1}</td>
                    <td>{row.col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}