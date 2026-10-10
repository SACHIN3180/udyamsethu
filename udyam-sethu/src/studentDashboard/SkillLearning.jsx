import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Circle,
    Clock3,
    Loader2,
    Play,
    Trophy,
    XCircle
} from "lucide-react";

export default function SkillLearning() {

    const [learning, setLearning] = useState(null);

    const [selectedModule, setSelectedModule] =
        useState(null);

    const [questions, setQuestions] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);

    const [generating, setGenerating] = useState(false);

    const [submitting, setSubmitting] = useState(false);


    // --------------------------------------------------
    // Get student skill ID
    // --------------------------------------------------

    const { studentSkillId } = useParams();


    const token =
        localStorage.getItem("token");


    // --------------------------------------------------
    // Load learning
    // --------------------------------------------------

    useEffect(() => {

        loadLearning();

    }, []);


    const loadLearning = async () => {

        try {

            setLoading(true);

            const response =
                await fetch(
                    `http://localhost:5000/api/skills-learning/${studentSkillId}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            const data =
                await response.json();


            if (data.success) {

                setLearning(data);

                if (data.currentModule) {

                    setSelectedModule(
                        data.currentModule
                    );
                    setCurrentQuestion(
                        Number(
                            data.currentModule.current_question || 0
                        )
                    );
                }
            }

        } catch (error) {

            console.error(
                "Learning loading error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // --------------------------------------------------
    // Generate questions
    // --------------------------------------------------

    const startModule = async (module) => {

        try {

            setSelectedModule(module);

            setQuestions([]);

            setCurrentQuestion(Number(module.current_question || 0));

            setSelectedAnswer("");

            setResult(null);

            setGenerating(true);


            const response =
                await fetch(
                    "http://localhost:5000/api/skills-learning/generate-questions",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            studentSkillId:
                                Number(studentSkillId),

                            moduleId:
                                module.id,

                            count: 5
                        })
                    }
                );


            const data =
                await response.json();


            if (data.success) {

                setQuestions(
                    data.questions
                );
            }

        } catch (error) {

            console.error(
                "Question generation error:",
                error
            );

        } finally {

            setGenerating(false);
        }
    };


    // --------------------------------------------------
    // Submit answer
    // --------------------------------------------------

    const submitAnswer = async () => {

        if (!selectedAnswer) return;


        const question =
            questions[currentQuestion];


        try {

            setSubmitting(true);


            const response =
                await fetch(
                    "http://localhost:5000/api/skills-learning/answer",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            studentSkillId:
                                Number(studentSkillId),

                            questionId:
                                question.id,

                            selectedAnswer
                        })
                    }
                );


            const data =
                await response.json();


            setResult(data);


            if (data.moduleCompleted) {

                if (data.nextModule) {

                    setSelectedModule(data.nextModule);

                    setQuestions([]);

                    setCurrentQuestion(0);

                    setSelectedAnswer("");

                    setResult(null);

                    setGenerating(true);

                    try {

                        const response = await fetch(
                            "http://localhost:5000/api/skills-learning/generate-questions",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`
                                },

                                body: JSON.stringify({
                                    studentSkillId: Number(studentSkillId),
                                    moduleId: data.nextModule.id,
                                    count: 5
                                })
                            }
                        );

                        const questionData =
                            await response.json();

                        if (questionData.success) {

                            setQuestions(
                                questionData.questions
                            );

                            setCurrentQuestion(0);
                        }

                    } catch (error) {

                        console.error(
                            "Next module questions error:",
                            error
                        );

                    } finally {

                        setGenerating(false);
                    }

                } else {

                    // All modules completed

                    setSelectedModule(null);

                    setQuestions([]);

                    setCurrentQuestion(0);

                    setSelectedAnswer("");

                    setResult(null);
                }

            } else {

                setTimeout(() => {

                    setCurrentQuestion(
                        currentQuestion + 1
                    );

                    setSelectedAnswer("");

                    setResult(null);

                }, 1200);
            }

        } catch (error) {

            console.error(
                "Answer submission error:",
                error
            );

        } finally {

            setSubmitting(false);
        }
    };


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <Loader2
                    className="animate-spin"
                    size={32}
                />

            </div>
        );
    }


    if (!learning) {

        return (
            <div className="p-8">
                Learning skill not found.
            </div>
        );
    }


    const skill =
        learning.skill;


    const question =
        questions[currentQuestion];


    return (

        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">

            {/* Header */}

            <div className="max-w-7xl mx-auto">

                <button
                    onClick={() =>
                        window.history.back()
                    }
                    className="flex items-center gap-2 mb-6 text-slate-600 dark:text-slate-300"
                >

                    <ArrowLeft size={18} />

                    Back to Skills

                </button>


                {/* Skill Header */}

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">

                                    <BookOpen
                                        className="text-indigo-600"
                                        size={24}
                                    />

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">
                                        {skill.category}
                                    </p>

                                    <h1 className="text-2xl md:text-3xl font-bold">
                                        {skill.skill_name}
                                    </h1>

                                </div>

                            </div>

                        </div>


                        <div className="text-left md:text-right">

                            <p className="text-sm text-slate-500">
                                Current Level
                            </p>

                            <h2 className="text-xl font-bold">
                                {skill.current_level}
                            </h2>

                        </div>

                    </div>


                    {/* Progress */}

                    <div className="mt-8">

                        <div className="flex justify-between mb-2">

                            <span className="text-sm font-medium">
                                Level Progress
                            </span>

                            <span className="font-bold">
                                {skill.progress}%
                            </span>

                        </div>

                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-indigo-600 rounded-full transition-all"
                                style={{
                                    width:
                                        `${skill.progress}%`
                                }}
                            />

                        </div>

                    </div>

                </div>


                <div className="grid lg:grid-cols-[320px_1fr] gap-6 mt-6">


                    {/* Modules */}

                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">

                        <h2 className="font-bold text-lg mb-4">
                            {skill.current_level} Modules
                        </h2>


                        <div className="space-y-3">

                            {learning.modules.map(
                                (module, index) => (

                                    <button
                                        key={module.id}
                                        disabled={
                                            module.status === "completed" ||
                                            module.status === "locked"
                                        }
                                        onClick={() => {

                                            if (
                                                module.status !== "completed" &&
                                                module.status !== "locked"
                                            ) {
                                                startModule(module);
                                            }

                                        }}
                                        className={`
                                            w-full text-left p-4 rounded-2xl border transition
                                            ${selectedModule?.id === module.id
                                                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                                                : "border-slate-200 dark:border-slate-800"
                                            }
                                        `}
                                    >

                                        <div className="flex gap-3">

                                            <div>

                                                {module.status === "completed" ? (

                                                    <CheckCircle2
                                                        size={20}
                                                        className="text-emerald-600"
                                                    />

                                                ) : module.status === "in_progress" ? (

                                                    <Play
                                                        size={20}
                                                        className="text-indigo-600"
                                                    />

                                                ) : (

                                                    <Circle
                                                        size={20}
                                                        className="text-slate-400"
                                                    />

                                                )}

                                            </div>


                                            <div>

                                                <p className="font-semibold">
                                                    {index + 1}.{" "}
                                                    {module.title}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    {module.description}
                                                </p>

                                            </div>

                                        </div>

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* Learning area */}

                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-8">


                        {generating ? (

                            <div className="min-h-[400px] flex flex-col items-center justify-center">

                                <Loader2
                                    size={40}
                                    className="animate-spin text-indigo-600"
                                />

                                <h2 className="font-bold text-xl mt-5">
                                    AI is preparing your questions
                                </h2>

                                <p className="text-slate-500 mt-2">
                                    Questions are being generated for{" "}
                                    {skill.skill_name}
                                </p>

                            </div>

                        ) : questions.length === 0 ? (

                            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">

                                <div className="w-20 h-20 rounded-3xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">

                                    <Play
                                        size={32}
                                        className="text-indigo-600"
                                    />

                                </div>


                                <h2 className="text-2xl font-bold mt-6">

                                    {selectedModule?.title ||
                                        "Start Learning"}

                                </h2>


                                <p className="text-slate-500 max-w-md mt-2">

                                    Start this module and AI will
                                    generate questions based on
                                    your current skill level.

                                </p>


                                {selectedModule && (

                                    <button
                                        onClick={() =>
                                            startModule(
                                                selectedModule
                                            )
                                        }
                                        className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                                    >

                                        <Play size={18} />

                                        Start Module

                                    </button>

                                )}

                            </div>

                        ) : question ? (

                            <div>

                                {/* Quiz header */}

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">

                                    <div>

                                        <p className="text-sm text-slate-500">
                                            {selectedModule?.title}
                                        </p>

                                        <h2 className="text-xl font-bold">
                                            Question{" "}
                                            {currentQuestion + 1}
                                            {" "}
                                            of{" "}
                                            {questions.length}
                                        </h2>

                                    </div>


                                    <div className="flex items-center gap-2 text-sm text-slate-500">

                                        <Clock3 size={17} />

                                        Practice

                                    </div>

                                </div>


                                {/* Question */}

                                <div>

                                    <h3 className="text-xl md:text-2xl font-bold leading-relaxed">

                                        {question.question}

                                    </h3>


                                    <div className="grid gap-3 mt-7">

                                        {question.options.map(
                                            (option, index) => (

                                                <button
                                                    key={index}
                                                    disabled={!!result}
                                                    onClick={() =>
                                                        setSelectedAnswer(
                                                            option
                                                        )
                                                    }
                                                    className={`
                                                        w-full text-left p-4 rounded-2xl border transition
                                                        ${selectedAnswer === option
                                                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10"
                                                            : "border-slate-200 dark:border-slate-800"
                                                        }
                                                    `}
                                                >

                                                    <span className="font-semibold mr-3">

                                                        {String.fromCharCode(
                                                            65 + index
                                                        )}

                                                    </span>

                                                    {option}

                                                </button>

                                            )
                                        )}

                                    </div>


                                    {result && (

                                        <div className={`
                                            mt-5 p-4 rounded-2xl
                                            ${result.correct
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-red-50 text-red-700"
                                            }
                                        `}>

                                            <div className="flex gap-3">

                                                {result.correct ? (

                                                    <CheckCircle2 />

                                                ) : (

                                                    <XCircle />

                                                )}

                                                <div>

                                                    <p className="font-bold">

                                                        {result.correct
                                                            ? "Correct!"
                                                            : "Incorrect"}

                                                    </p>

                                                    <p className="text-sm mt-1">

                                                        {result.message}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    )}


                                    <button
                                        disabled={
                                            !selectedAnswer ||
                                            submitting ||
                                            !!result
                                        }
                                        onClick={submitAnswer}
                                        className="mt-7 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
                                    >

                                        {submitting
                                            ? "Checking..."
                                            : "Submit Answer"}

                                    </button>

                                </div>

                            </div>

                        ) : (

                            <div className="text-center">

                                <Trophy
                                    size={48}
                                    className="mx-auto text-indigo-600"
                                />

                                <h2 className="text-2xl font-bold mt-4">
                                    Module Completed
                                </h2>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}