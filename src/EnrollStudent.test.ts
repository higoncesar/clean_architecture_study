import EnrollStudent from "./EnrollStudent";

it("Should not enroll without valid student name", function () {
    const enrollmentRequest = {
        student: {
            name: "Ana",
            cpf: "123.456.789-99",
        }
    }  
    
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
});


it("Should not enroll without valid student cpf", function () {
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "123.456.789-99"
        }
    }
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
});

it("Should not enroll duplicated student", function () {
    const enrollmentRequest = {
        student: {
            name: "Ana Silva",
            cpf: "832.081.519-34"
        }
    }
    const enrollStudent = new EnrollStudent();
    enrollStudent.execute(enrollmentRequest)
    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
});