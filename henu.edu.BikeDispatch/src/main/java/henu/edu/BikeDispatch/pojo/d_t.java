package henu.edu.BikeDispatch.pojo;

public class d_t {
    private Integer dId;  //调度员
    private Integer tId;   //任务

    public d_t() {
    }

    public d_t(Integer dId, Integer tId) {
        this.dId = dId;
        this.tId = tId;
    }

    public Integer getdId() {
        return dId;
    }

    public void setdId(Integer dId) {
        this.dId = dId;
    }

    public Integer gettId() {
        return tId;
    }

    public void settId(Integer tId) {
        this.tId = tId;
    }
}
