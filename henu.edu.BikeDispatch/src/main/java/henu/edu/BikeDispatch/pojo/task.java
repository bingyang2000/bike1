package henu.edu.BikeDispatch.pojo;

import java.util.Date;

public class task {
    private Integer id;
    private Date firstTime;
    private Date startTime;
    private Date endTime;
    private String state;
    private double needSpan;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getFirstTime() {
        return firstTime;
    }

    public void setFirstTime(Date firstTime) {
        this.firstTime = firstTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public double getNeedSpan() {
        return needSpan;
    }

    public void setNeedSpan(double needSpan) {
        this.needSpan = needSpan;
    }
}
