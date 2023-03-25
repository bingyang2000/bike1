package henu.edu.BikeDispatch.pojo;

public class dispatcher {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    private Integer id;
    private String jobNumber;
    private String password;
    private String phoneNumber;
    private String cardId;
    private String sex;
    private Integer age;
    private String name;
    private Integer successNum;
    private Integer failNum;
    private Integer dist;

    public Integer getDist() {
        return dist;
    }

    public void setDist(Integer dist) {
        this.dist = dist;
    }

    public String getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(String jobNumber) {
        this.jobNumber = jobNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSuccessNum() {
        return successNum;
    }

    public void setSuccessNum(Integer successNum) {
        this.successNum = successNum;
    }

    public Integer getFailNum() {
        return failNum;
    }

    public void setFailNum(Integer failNum) {
        this.failNum = failNum;
    }
}
