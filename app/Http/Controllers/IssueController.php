<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\IssueService;
use App\Http\Requests\NewIssueRequest;
use App\Http\Requests\IssueUpdateRequest;
use Illuminate\Validation\ValidationException;

class IssueController extends Controller
{
    public function getIssues(): Response
    {
        $issues = Issue::get();
        return response($issues);
    }

    public function createIssue(
        User $user, 
        Book $book, 
        NewIssueRequest $request, 
        IssueService $issueService
        ): Response
    {
        try {
            $validated = $request->validated();
            $issue = $issueService->createIssue($user, $book, $validated);
            return response($issue, 201);
        } catch(ValidationException $e) {
            return response($e->errors(), 422);
        } catch(\Exception $e) {
            return response($e->getMessage(), 400);
        }
    }

    public function updateIssue(Issue $issue, IssueUpdateRequest $request, IssueService $issueService): Response
    {
        try {
            $validated = $request->validated();
            $updatedIssue = $issueService->updateIssue($issue, $validated);
            return response($updatedIssue);
        } catch(ValidationException $e) {
            return response($e->errors(), 422);
        }
    }
}
